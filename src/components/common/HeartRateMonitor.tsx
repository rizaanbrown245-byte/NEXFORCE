import React, { useState, useEffect, useRef } from 'react';
import { Heart, Bluetooth, Activity, Wifi, X, Check, AlertCircle, RefreshCw } from 'lucide-react';

interface HeartRateMonitorProps {
  compact?: boolean;
  onBpmChange?: (bpm: number) => void;
}

export const HeartRateMonitor: React.FC<HeartRateMonitorProps> = ({ compact = false, onBpmChange }) => {
  const [bpm, setBpm] = useState<number>(132);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [deviceName, setDeviceName] = useState<string>('Polar H10 (Simulated)');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('connected');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const bluetoothDeviceRef = useRef<any>(null);

  // Simulated BPM fluctuations
  useEffect(() => {
    if (!isSimulating || connectionStatus !== 'connected') return;

    const interval = setInterval(() => {
      setBpm((prev) => {
        // Natural physiological variance between 120 and 158
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = Math.max(115, Math.min(168, prev + delta));
        if (onBpmChange) onBpmChange(next);
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating, connectionStatus, onBpmChange]);

  // Real Web Bluetooth GATT Connection
  const connectBluetoothDevice = async () => {
    try {
      setErrorMessage(null);
      setConnectionStatus('connecting');

      const nav = navigator as any;
      if (!nav.bluetooth) {
        setErrorMessage('Web Bluetooth is not supported on this browser. Using realistic simulated heart rate sensor.');
        setIsSimulating(true);
        setConnectionStatus('connected');
        setDeviceName('Smart Wearable (Simulated)');
        return;
      }

      const device = await nav.bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
        optionalServices: ['battery_service']
      });

      bluetoothDeviceRef.current = device;
      setDeviceName(device.name || 'Bluetooth Heart Rate Monitor');

      const server = await device.gatt?.connect();
      const service = await server?.getPrimaryService('heart_rate');
      const characteristic = await service?.getCharacteristic('heart_rate_measurement');

      await characteristic?.startNotifications();
      characteristic?.addEventListener('characteristicvaluechanged', (event: any) => {
        const value = event.target.value;
        const flags = value.getUint8(0);
        let currentBpm: number;
        if (flags & 0x01) {
          currentBpm = value.getUint16(1, /*littleEndian=*/true);
        } else {
          currentBpm = value.getUint8(1);
        }
        setBpm(currentBpm);
        if (onBpmChange) onBpmChange(currentBpm);
      });

      setIsSimulating(false);
      setIsConnected(true);
      setConnectionStatus('connected');
    } catch (err: any) {
      console.warn('Bluetooth pairing cancelled or failed:', err);
      if (err.name !== 'NotFoundError') {
        setErrorMessage(err.message || 'Could not pair Bluetooth device. Reverting to simulator.');
      }
      setIsSimulating(true);
      setConnectionStatus('connected');
    }
  };

  const disconnectDevice = () => {
    if (bluetoothDeviceRef.current && bluetoothDeviceRef.current.gatt?.connected) {
      bluetoothDeviceRef.current.gatt.disconnect();
    }
    setIsConnected(false);
    setIsSimulating(false);
    setConnectionStatus('disconnected');
    setBpm(0);
  };

  // Determine Heart Rate Zone
  const getHrZone = (currentBpm: number) => {
    if (currentBpm < 115) return { name: 'Zone 1: Warm Up', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    if (currentBpm < 135) return { name: 'Zone 2: Fat Burn', color: 'text-sky-400', bg: 'bg-blue-600/20' };
    if (currentBpm < 152) return { name: 'Zone 3: Aerobic Cardio', color: 'text-amber-400', bg: 'bg-amber-500/20' };
    if (currentBpm < 168) return { name: 'Zone 4: Anaerobic Threshold', color: 'text-orange-400', bg: 'bg-orange-500/20' };
    return { name: 'Zone 5: Maximum Peak', color: 'text-red-400', bg: 'bg-red-500/20' };
  };

  const zone = getHrZone(bpm);

  if (compact) {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#111b33] hover:bg-[#1b2520] border border-[#213253] rounded-xl text-xs font-mono transition-colors shadow-sm"
          title="Heart Rate Monitor"
        >
          <div className="relative">
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          </div>
          <span className="font-bold text-white text-xs sm:text-sm font-mono-numbers">
            {bpm > 0 ? `${bpm} BPM` : 'HR Sync'}
          </span>
          <span className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-sky-400 animate-ping' : 'bg-gray-600'}`} />
        </button>

        {/* Modal */}
        {isModalOpen && renderModal()}
      </>
    );
  }

  function renderModal() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="bg-[#0f172a] border border-blue-600/40 rounded-3xl p-5 sm:p-6 max-w-md w-full space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#213253]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
              <h3 className="text-base font-bold font-heading text-white">Wearable Heart Rate Sync</h3>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-1 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Live BPM Readout */}
          <div className="bg-[#162038] rounded-2xl p-5 border border-[#213253] text-center space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                {deviceName}
              </span>
            </div>

            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-5xl font-black font-mono-numbers text-white tracking-tight drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                {bpm}
              </span>
              <span className="text-sm font-mono text-red-400 font-bold">BPM</span>
            </div>

            {/* Zone pill */}
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${zone.bg} ${zone.color}`}>
              {zone.name}
            </div>

            {/* Simulated ECG Waveform SVG */}
            <div className="pt-2">
              <svg viewBox="0 0 300 40" className="w-full h-8 stroke-sky-400 fill-none opacity-80">
                <path
                  d="M 0 20 L 60 20 L 75 10 L 85 35 L 95 5 L 105 25 L 115 20 L 180 20 L 195 10 L 205 35 L 215 5 L 225 25 L 235 20 L 300 20"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs text-amber-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Connection Controls */}
          <div className="space-y-2 pt-1 text-xs">
            <button
              onClick={connectBluetoothDevice}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Bluetooth className="w-4 h-4" />
              <span>Scan & Pair BLE Sensor (Garmin, Polar, Apple Watch)</span>
            </button>

            <button
              onClick={() => {
                setIsSimulating(true);
                setConnectionStatus('connected');
                setDeviceName('Smart Wearable (Simulated)');
              }}
              className="w-full py-2 bg-[#162038] hover:bg-[#1f2d4d] text-sky-400 font-mono font-semibold rounded-xl border border-[#213253] flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4" />
              <span>Use High-Accuracy Simulation Mode</span>
            </button>

            {connectionStatus === 'connected' && (
              <button
                onClick={disconnectDevice}
                className="w-full py-2 text-red-400 hover:text-red-300 text-xs font-mono text-center"
              >
                Disconnect Sensor
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] p-4 rounded-2xl border border-[#213253] flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center">
          <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-gray-400 uppercase">Heart Rate Live Telemetry</div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono-numbers text-white">{bpm} BPM</span>
            <span className={`text-[11px] font-mono ${zone.color}`}>{zone.name}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="px-3 py-1.5 bg-[#162038] hover:bg-[#1f2d4d] text-sky-400 text-xs font-mono rounded-lg border border-[#213253]"
      >
        Manage Device
      </button>

      {isModalOpen && renderModal()}
    </div>
  );
};
