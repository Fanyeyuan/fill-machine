declare module 'modbus'{
  export interface Modbus {
    read(address: string, callback: (err: Error|null, res: number) => void): void;
    read(address: string): Promise<number>;
    write(address: string, value: number | number[], callback: (err: Error|null, res: number) => void): void;
    write(address: string, value: number | number[]): Promise<number>;
  }

  export default function modbus(address: string, port: number, unitId?: number): Modbus
}
