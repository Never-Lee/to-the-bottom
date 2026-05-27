import { getBaseDrawCount } from "../phases/getBaseDrawCount";

console.log("CRUISE");

for (let i = 0; i < 6; i++) {
  console.log(i, getBaseDrawCount("CRUISE", i));
}

console.log("\nSINKING");

for (let i = 0; i < 6; i++) {
  console.log(i, getBaseDrawCount("SINKING", i));
}