import * as protocol from "./protocol";
import * as storage from "./storage";

export const SAVE = "save";

/**
 * Helper interface to wrap a snapshot with the sequence number it was taken at
 */
export interface ICollaborativeObjectSnapshot {
    sequenceNumber: number;

    snapshot: any;
}

export interface ICollaborativeObjectSave {
    type: string;

    message: string;
}

export interface ICollaborativeObject {
    /**
     * A readonly identifier for the collaborative object
     */
    id: string;

    /**
     * The type of the collaborative object
     */
    type: string;

    /**
     * Returns whether the object has any pending unacked ops.
     */
    dirty: boolean;

    /**
     * Marker to clearly identify the object as a collaborative object
     */
    __collaborativeObject__: boolean;

    /**
     * Attaches an event listener for the given event
     */
    on(event: string | symbol, listener: (...args: any[]) => void): this;

    /**
     * Removes the specified listenever
     */
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;

    /**
     * Attaches the given collaborative object to its containing document
     */
    attach(): this;

    /**
     * Returns whether the given collaborative object is local
     */
    isLocal(): boolean;

    /**
     * Snapshots the object
     */
    snapshot(): storage.ITree;

    /**
     * Returns a promise indicating whether or not the distributed data structure is ready to process
     * incoming messages.
     */
    ready(): Promise<void>;

    /**
     * Transforms the given message relative to the provided sequence number
     */
    transform(message: protocol.IObjectMessage, sequenceNumber: number): protocol.IObjectMessage;
}

export interface IDataBlob {
    content?: Buffer;
    size: number;
    type: string;
    sha: string;
    fileName: string;
    url: string; // Link to durable URL
}

export interface IImageBlob extends IDataBlob {
    height: number;
    width: number;
}

export function getFileBlobType(mimeType: string) {
    switch (mimeType) {
        case "image/jpeg":
        case "image/png":
        case "image/gif":
        case "image/bmp": {
            return "image";
        }
        default: {
            return null;
        }
    }
}
