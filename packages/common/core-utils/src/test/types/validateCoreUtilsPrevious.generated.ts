/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by flub generate:typetests in @fluid-tools/build-cli.
 */

import type { TypeOnly, MinimalType, FullType, requireAssignableTo } from "@fluidframework/build-tools";
import type * as old from "@fluidframework/core-utils-previous/internal";

import type * as current from "../../index.js";

declare type MakeUnusedImportErrorsGoAway<T> = TypeOnly<T> | MinimalType<T> | FullType<T> | typeof old | typeof current | requireAssignableTo<true, true>;

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_Deferred": {"forwardCompat": false}
 */
declare type old_as_current_for_ClassDeclaration_Deferred = requireAssignableTo<TypeOnly<old.Deferred<any>>, TypeOnly<current.Deferred<any>>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_Deferred": {"backCompat": false}
 */
declare type current_as_old_for_ClassDeclaration_Deferred = requireAssignableTo<TypeOnly<current.Deferred<any>>, TypeOnly<old.Deferred<any>>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_Heap": {"forwardCompat": false}
 */
declare type old_as_current_for_ClassDeclaration_Heap = requireAssignableTo<TypeOnly<old.Heap<any>>, TypeOnly<current.Heap<any>>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_Heap": {"backCompat": false}
 */
declare type current_as_old_for_ClassDeclaration_Heap = requireAssignableTo<TypeOnly<current.Heap<any>>, TypeOnly<old.Heap<any>>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IComparer": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_IComparer = requireAssignableTo<TypeOnly<old.IComparer<any>>, TypeOnly<current.IComparer<any>>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IComparer": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_IComparer = requireAssignableTo<TypeOnly<current.IComparer<any>>, TypeOnly<old.IComparer<any>>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IHeapNode": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_IHeapNode = requireAssignableTo<TypeOnly<old.IHeapNode<any>>, TypeOnly<current.IHeapNode<any>>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IHeapNode": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_IHeapNode = requireAssignableTo<TypeOnly<current.IHeapNode<any>>, TypeOnly<old.IHeapNode<any>>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IPromiseTimer": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_IPromiseTimer = requireAssignableTo<TypeOnly<old.IPromiseTimer>, TypeOnly<current.IPromiseTimer>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IPromiseTimer": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_IPromiseTimer = requireAssignableTo<TypeOnly<current.IPromiseTimer>, TypeOnly<old.IPromiseTimer>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IPromiseTimerResult": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_IPromiseTimerResult = requireAssignableTo<TypeOnly<old.IPromiseTimerResult>, TypeOnly<current.IPromiseTimerResult>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IPromiseTimerResult": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_IPromiseTimerResult = requireAssignableTo<TypeOnly<current.IPromiseTimerResult>, TypeOnly<old.IPromiseTimerResult>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ITimer": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_ITimer = requireAssignableTo<TypeOnly<old.ITimer>, TypeOnly<current.ITimer>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ITimer": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_ITimer = requireAssignableTo<TypeOnly<current.ITimer>, TypeOnly<old.ITimer>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_Lazy": {"forwardCompat": false}
 */
declare type old_as_current_for_ClassDeclaration_Lazy = requireAssignableTo<TypeOnly<old.Lazy<any>>, TypeOnly<current.Lazy<any>>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_Lazy": {"backCompat": false}
 */
declare type current_as_old_for_ClassDeclaration_Lazy = requireAssignableTo<TypeOnly<current.Lazy<any>>, TypeOnly<old.Lazy<any>>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_LazyPromise": {"forwardCompat": false}
 */
declare type old_as_current_for_ClassDeclaration_LazyPromise = requireAssignableTo<TypeOnly<old.LazyPromise<any>>, TypeOnly<current.LazyPromise<any>>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_LazyPromise": {"backCompat": false}
 */
declare type current_as_old_for_ClassDeclaration_LazyPromise = requireAssignableTo<TypeOnly<current.LazyPromise<any>>, TypeOnly<old.LazyPromise<any>>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_NumberComparer": {"forwardCompat": false}
 */
declare type old_as_current_for_VariableDeclaration_NumberComparer = requireAssignableTo<TypeOnly<typeof old.NumberComparer>, TypeOnly<typeof current.NumberComparer>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_NumberComparer": {"backCompat": false}
 */
declare type current_as_old_for_VariableDeclaration_NumberComparer = requireAssignableTo<TypeOnly<typeof current.NumberComparer>, TypeOnly<typeof old.NumberComparer>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_PromiseCache": {"forwardCompat": false}
 */
declare type old_as_current_for_ClassDeclaration_PromiseCache = requireAssignableTo<TypeOnly<old.PromiseCache<any,any>>, TypeOnly<current.PromiseCache<any,any>>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_PromiseCache": {"backCompat": false}
 */
declare type current_as_old_for_ClassDeclaration_PromiseCache = requireAssignableTo<TypeOnly<current.PromiseCache<any,any>>, TypeOnly<old.PromiseCache<any,any>>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_PromiseCacheExpiry": {"forwardCompat": false}
 */
declare type old_as_current_for_TypeAliasDeclaration_PromiseCacheExpiry = requireAssignableTo<TypeOnly<old.PromiseCacheExpiry>, TypeOnly<current.PromiseCacheExpiry>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_PromiseCacheExpiry": {"backCompat": false}
 */
declare type current_as_old_for_TypeAliasDeclaration_PromiseCacheExpiry = requireAssignableTo<TypeOnly<current.PromiseCacheExpiry>, TypeOnly<old.PromiseCacheExpiry>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_PromiseCacheOptions": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_PromiseCacheOptions = requireAssignableTo<TypeOnly<old.PromiseCacheOptions>, TypeOnly<current.PromiseCacheOptions>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_PromiseCacheOptions": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_PromiseCacheOptions = requireAssignableTo<TypeOnly<current.PromiseCacheOptions>, TypeOnly<old.PromiseCacheOptions>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_PromiseTimer": {"forwardCompat": false}
 */
declare type old_as_current_for_ClassDeclaration_PromiseTimer = requireAssignableTo<TypeOnly<old.PromiseTimer>, TypeOnly<current.PromiseTimer>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_PromiseTimer": {"backCompat": false}
 */
declare type current_as_old_for_ClassDeclaration_PromiseTimer = requireAssignableTo<TypeOnly<current.PromiseTimer>, TypeOnly<old.PromiseTimer>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_Timer": {"forwardCompat": false}
 */
declare type old_as_current_for_ClassDeclaration_Timer = requireAssignableTo<TypeOnly<old.Timer>, TypeOnly<current.Timer>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_Timer": {"backCompat": false}
 */
declare type current_as_old_for_ClassDeclaration_Timer = requireAssignableTo<TypeOnly<current.Timer>, TypeOnly<old.Timer>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_assert": {"forwardCompat": false}
 */
declare type old_as_current_for_FunctionDeclaration_assert = requireAssignableTo<TypeOnly<typeof old.assert>, TypeOnly<typeof current.assert>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_assert": {"backCompat": false}
 */
declare type current_as_old_for_FunctionDeclaration_assert = requireAssignableTo<TypeOnly<typeof current.assert>, TypeOnly<typeof old.assert>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_compareArrays": {"forwardCompat": false}
 */
declare type old_as_current_for_VariableDeclaration_compareArrays = requireAssignableTo<TypeOnly<typeof old.compareArrays>, TypeOnly<typeof current.compareArrays>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_compareArrays": {"backCompat": false}
 */
declare type current_as_old_for_VariableDeclaration_compareArrays = requireAssignableTo<TypeOnly<typeof current.compareArrays>, TypeOnly<typeof old.compareArrays>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_delay": {"forwardCompat": false}
 */
declare type old_as_current_for_VariableDeclaration_delay = requireAssignableTo<TypeOnly<typeof old.delay>, TypeOnly<typeof current.delay>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_delay": {"backCompat": false}
 */
declare type current_as_old_for_VariableDeclaration_delay = requireAssignableTo<TypeOnly<typeof current.delay>, TypeOnly<typeof old.delay>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_isObject": {"forwardCompat": false}
 */
declare type old_as_current_for_VariableDeclaration_isObject = requireAssignableTo<TypeOnly<typeof old.isObject>, TypeOnly<typeof current.isObject>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_isObject": {"backCompat": false}
 */
declare type current_as_old_for_VariableDeclaration_isObject = requireAssignableTo<TypeOnly<typeof current.isObject>, TypeOnly<typeof old.isObject>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_isPromiseLike": {"forwardCompat": false}
 */
declare type old_as_current_for_VariableDeclaration_isPromiseLike = requireAssignableTo<TypeOnly<typeof old.isPromiseLike>, TypeOnly<typeof current.isPromiseLike>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_isPromiseLike": {"backCompat": false}
 */
declare type current_as_old_for_VariableDeclaration_isPromiseLike = requireAssignableTo<TypeOnly<typeof current.isPromiseLike>, TypeOnly<typeof old.isPromiseLike>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_setLongTimeout": {"forwardCompat": false}
 */
declare type old_as_current_for_FunctionDeclaration_setLongTimeout = requireAssignableTo<TypeOnly<typeof old.setLongTimeout>, TypeOnly<typeof current.setLongTimeout>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_setLongTimeout": {"backCompat": false}
 */
declare type current_as_old_for_FunctionDeclaration_setLongTimeout = requireAssignableTo<TypeOnly<typeof current.setLongTimeout>, TypeOnly<typeof old.setLongTimeout>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_unreachableCase": {"forwardCompat": false}
 */
declare type old_as_current_for_FunctionDeclaration_unreachableCase = requireAssignableTo<TypeOnly<typeof old.unreachableCase>, TypeOnly<typeof current.unreachableCase>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_unreachableCase": {"backCompat": false}
 */
declare type current_as_old_for_FunctionDeclaration_unreachableCase = requireAssignableTo<TypeOnly<typeof current.unreachableCase>, TypeOnly<typeof old.unreachableCase>>
