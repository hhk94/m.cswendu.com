const log = false;
// const log = true;
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

//专门针对后端返回时间格式处理时间20191119064333
export function getTime(time){
	if(time){
		return time.slice(0,4)+'-'+time.slice(4,6)+'-'+time.slice(6,8)
	}
	
}
