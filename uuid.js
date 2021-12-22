// Name: UUIDGen
// Description: Generate a new uuid and add it to the clipboard
// Author: Franck Boucher
// Twitter: @Franck_Boucher

import "@johnlindquist/kit";
const { v4: uuidv4 } = await npm("uuid");
let uuid = uuidv4();
await copy(uuid);
