const log = true;
export function console_log(txt) {
if (txt === 0 || txt === "0") {
// empty
}else {
  if (!txt){
	txt = "空txt";
  }
}
log === true ? console.log(txt): "";
}