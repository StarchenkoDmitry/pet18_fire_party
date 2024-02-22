//CODE was copy with https://stackoverflow.com/questions/48563969/c-like-mutex-in-nodejs
export class Mutex {
    private queue = [];
    private locked = false;

    async lock(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.locked) {
                this.queue.push([resolve, reject]);
            } else {
                this.locked = true;
                resolve();
            }
        });
    }

    unlock() {
        if (this.queue.length > 0) {
            const [resolve, reject] = this.queue.shift();
            resolve();
        } else {
            this.locked = false;
        }
    }
}

type MutexFunc = (value: void | PromiseLike<void>) => void;

interface KetMutex {
    queue: MutexFunc[];
    locked: boolean;
}

export class MutexKeys {
    private keys = new Map<string, KetMutex>();

    async lock(key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            let keyer = this.keys.get(key);
            if (!keyer) {
                keyer = { locked: false, queue: [] };
                this.keys.set(key, keyer);
            }

            if (keyer.locked) {
                keyer.queue.push(resolve);
            } else {
                keyer.locked = true;
                resolve();
            }
        });
    }

    unlock(key: string) {
        let keyer = this.keys.get(key);
        if (!keyer) throw "Error keyer is not exist.";

        if (keyer.queue.length > 0) {
            const resolve = keyer.queue.shift();
            resolve();
        } else {
            keyer.locked = false;
            this.keys.delete(key);
        }
    }
}
