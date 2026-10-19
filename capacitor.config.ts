export interface CapacitorConfig {
  appId: string;
  appName: string;
  webDir: string;
  bundledWebRuntime?: boolean;
  server?: {
    androidScheme?: string;
    cleartext?: boolean;
    url?: string;
  };
  android?: {
    backgroundColor?: string;
    allowMixedContent?: boolean;
    captureInput?: boolean;
    webContentsDebuggingEnabled?: boolean;
  };
}

const config: CapacitorConfig = {
  appId: 'com.rbdigital.nexforce',
  appName: 'NEXFORCE',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  android: {
    backgroundColor: '#090d0b',
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;
