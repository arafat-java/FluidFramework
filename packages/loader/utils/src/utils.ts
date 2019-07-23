/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ConnectionState, MessageType } from "@prague/container-definitions";
import { EventEmitter } from "events";

/**
 * Check if the string is a system message type, which includes
 * MessageType.RemoteHelp, MessageType.Integrate, MessageType.ClientJoin,
 * MessageType.ClientLeave, MessageType.Fork
 *
 * @param type - the type to check
 * @returns true if it is a system message type
 */
export function isSystemType(type: string) {
    return (
        type === MessageType.RemoteHelp ||
        type === MessageType.Integrate ||
        type === MessageType.ClientJoin ||
        type === MessageType.ClientLeave ||
        type === MessageType.Fork);
}

export function raiseConnectedEvent(emitter: EventEmitter, state: ConnectionState, clientId: string) {
    if (state === ConnectionState.Connected) {
        emitter.emit("connected", clientId);
    } else if (state === ConnectionState.Connecting) {
        emitter.emit("connecting", clientId);
    } else {
        emitter.emit("disconnected");
    }
}
