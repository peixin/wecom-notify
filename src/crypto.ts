const byteStringToUint8Array = (byteString: string) => {
  const ui = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; ++i) {
    ui[i] = byteString.charCodeAt(i);
  }
  return ui;
};

const getPrivateKey = async (encoder: TextEncoder, secret: string, keyUsages: string[]) => {
  const secretKeyData = encoder.encode(secret);

  try {
    return await crypto.subtle.importKey(
      "raw",
      secretKeyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      keyUsages
    );
  } catch {
    return null;
  }
};

export const verify = async (secret: string, payload: string, signatureStr: string) => {
  const encoder = new TextEncoder();
  const key = await getPrivateKey(encoder, secret, ["verify"]);
  if (!key) {
    console.error("get key error");
    return false;
  }

  let signature: ArrayBuffer | null = null;
  try {
    signature = byteStringToUint8Array(atob(signatureStr));
  } catch {
    console.error("signature string to ArrayBuffer error");
    return false;
  }

  const payloadText = encoder.encode(payload);

  try {
    const verified = await crypto.subtle.verify("HMAC", key, signature, payloadText);
    return verified;
  } catch {
    console.error("verify error");
    return false;
  }
};
