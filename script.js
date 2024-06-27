class Node {
    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}
class HashMap {
    constructor(initialCapacity = 10) {
        this.capacity = initialCapacity;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null);
        this.loadFactor = 0.75;
    }
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }
    set(key, value) {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = new Node(key, value);
        } else {
            let current = this.buckets[index];
            while (current) {
                if (current.key === key) {
                    current.value = value;
                    return;
                }
                if (!current.next) {
                    break;
                }
                current = current.next;
            }
            current.next = new Node(key, value);
        }
    }
    get(key) {
        const index = this.hash(key);
        const bucket = this.bucket[index];

        if (!bucket) {
            return null;
        }
        for (const entry of bucket) {
            if (entry.key === key) {
                return entry.value;
            }
        }

        return null;
    }
    has(key) {
        const index = this.hash(key);
        const bucket = this.bucket[index];

        if (!bucket) {
            return false;
        }
        for (const entry of bucket) {
            if (entry.key === key) {
                return true;
            }
        }

        return false;
    }
    remove(key) {
        const index = this.hash(key);
        const bucket = this.bucket[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    length() {
        let counter = 0;
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    if (entry.key) {
                        counter++;
                    }
                }
            }
        }
        return counter;
    }
    clear() {
        this.buckets = Array(this.size).fill(null).map(() => []);
    }
    keys() {
        let keys = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    keys.push(entry.key);
                }
            }
        }
        return keys;
    }
    values() {
        let values = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    values.push(entry.value);
                }
            }
        }
        return values;
    }
    entries() {
        let entriesArray = [];

        for (const bucket of this.buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    let pairArray = [entry.key, entry.value];
                    entriesArray.push(pairArray);
                }
            }
        }
        return entriesArray;
    }
    resize(newCapacity) {
        const oldBuckets = this.buckets;
        this.capacity = newCapacity;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;

        for (const bucket of oldBuckets) {
            let current = bucket;
            while (current) {
                this.set(current.key, current.value);
                current = current.next;
            }
        }
    }

}
