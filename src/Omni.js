import { DeviceEventEmitter } from "react-native";
import { Constants } from "@common";

export const EventEmitter = DeviceEventEmitter;

/**
 * Display the message toast-like (work both with Android and iOS)
 * @param msg Message to display
 * @param duration Display duration
 */

export const toast = (msg, duration = 4000) =>
  EventEmitter.emit(Constants.EmitCode.Toast, msg, duration);
