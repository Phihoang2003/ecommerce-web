import * as nodeCrypto from "crypto";

const randomTokenByCrypto = (bytes: number): string =>
  nodeCrypto.randomBytes(bytes).toString("hex");
// create a hash of the token using SHA256 algorithm
const hashTokenByCrypto = (token: string): string =>
  nodeCrypto.createHash("sha256").update(token).digest("hex");

export { randomTokenByCrypto, hashTokenByCrypto };
