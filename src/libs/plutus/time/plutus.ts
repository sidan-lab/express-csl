import {
  AssetClass,
  AssocMap,
  BuiltinByteString,
  ConStr,
  ConStr0,
  ConStr1,
  ConStr2,
  Integer,
  MaybeStakingHash,
  POSIXTime,
  PaymentPubKeyHash,
  PubKeyHash,
  PubKeyAddress,
  ScriptAddress,
  Tuple
} from './type'

export const conStr = <N, T>(constructor: N, fields: T): ConStr<N, T> => ({
  constructor,
  fields
})
export const conStr0 = <T>(fields: T): ConStr0<T> => conStr<0, T>(0, fields)
export const conStr1 = <T>(fields: T): ConStr1<T> => conStr<1, T>(1, fields)
export const conStr2 = <T>(fields: T): ConStr2<T> => conStr<2, T>(2, fields)
export const builtinByteString = (bytes: string): BuiltinByteString => ({ bytes })
export const maybeStakingHash = (stakeCredential: string): MaybeStakingHash => {
  if (stakeCredential === '') {
    return conStr1<[]>([])
  }
  return conStr0<[ConStr0<[ConStr0<[BuiltinByteString]>]>]>([
    conStr0<[ConStr0<[BuiltinByteString]>]>([conStr0<[BuiltinByteString]>([builtinByteString(stakeCredential)])])
  ])
}
export const pubKeyAddress = (bytes: string, stakeCredential?: string): PubKeyAddress =>
  conStr0<[ConStr0<[BuiltinByteString]>, MaybeStakingHash]>([
    conStr0<[BuiltinByteString]>([builtinByteString(bytes)]),
    maybeStakingHash(stakeCredential || '')
  ])
export const scriptAddress = (bytes: string, stakeCredential?: string): ScriptAddress =>
  conStr0<[ConStr1<[BuiltinByteString]>, MaybeStakingHash]>([
    conStr1<[BuiltinByteString]>([builtinByteString(bytes)]),
    maybeStakingHash(stakeCredential || '')
  ])
export const assetClass = (policyId: string, tokenName: string): AssetClass =>
  conStr0<[BuiltinByteString, BuiltinByteString]>([builtinByteString(policyId), builtinByteString(tokenName)])
export const paymentPubKeyHash = (bytes: string): PaymentPubKeyHash => builtinByteString(bytes)
export const pubKeyHash = (bytes: string): PubKeyHash => builtinByteString(bytes)
export const posixTime = (int: number): POSIXTime => ({ int })
export const integer = (int: number): Integer => ({ int })
export const assocMap = <K, V>(itemsMap: [K, V][]): AssocMap<K, V> => ({ map: itemsMap.map(([k, v]) => ({ k, v })) })
export const tuple = <K, V>(key: K, value: V): Tuple<K, V> => conStr0([key, value])
