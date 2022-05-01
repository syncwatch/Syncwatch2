import { Injectable } from '@angular/core';
import { firstValueFrom, map, of } from 'rxjs';

@Injectable()
export class StorageService {
    private byteSizes = [
        {v: 1000000000, s: 'GB'},
        {v: 1000000, s: 'MB'},
        {v: 1000, s: 'KB'},
        {v: 0, s: 'B'}
    ];

    constructor() {
    }

    private bytesToReadable(b: number | undefined): string {
        if (b === undefined) return "Unknown";
        for (let byteSize of this.byteSizes) {
            if (b >= byteSize.v) return `${(b / byteSize.v).toFixed()} ${byteSize.s}`;
        }
        return b.toFixed();
    }

    async isStoragePersisted(): Promise<boolean> {
        return await navigator.storage && navigator.storage.persisted ?
            navigator.storage.persisted() :
            Promise.reject('storage not available')
    }

    async persist(): Promise<boolean> {
        return await navigator.storage && navigator.storage.persist ?
            navigator.storage.persist() :
            Promise.reject('storage not available');
    }

    async getStorageEstimate(): Promise<StorageEstimate> {
        return await navigator.storage && navigator.storage.estimate ?
            navigator.storage.estimate() :
            Promise.reject('storage not available');
    }

    async getStorageEstimateReadable(): Promise<{ quota: string, usage: string }> {
        return await firstValueFrom<{ quota: string, usage: string }>(of(await this.getStorageEstimate()).pipe(
            map(((est: StorageEstimate) => {
                return { quota: this.bytesToReadable(est.quota), usage: this.bytesToReadable(est.usage) };
            }))
        ));
    }

    async tryPersistWithoutPromtingUser(): Promise<string> {
        if (!navigator.storage || !navigator.storage.persisted) {
            return "never";
        }
        let persisted = await navigator.storage.persisted();
        if (persisted) {
            return "persisted";
        }
        if (!navigator.permissions || !navigator.permissions.query) {
            return "prompt"; // It MAY be successful to prompt. Don't know.
        }
        const permission = await navigator.permissions.query({
            name: "persistent-storage"
        });
        if (permission.state === "granted") {
            persisted = await navigator.storage.persist();
            if (persisted) {
                return "persisted";
            } else {
                throw new Error("Failed to persist");
            }
        }
        if (permission.state === "prompt") {
            return "prompt";
        }
        return "never";
    }
}
