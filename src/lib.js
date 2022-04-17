export default class Lib{
	static get month(){
		return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	}
    static dateFormat(value){
		const date = new Date(value)
		const yyyy = date.getFullYear()
		let mm = this.month[date.getMonth()]
		let dd = date.getDate()
		dd += this.getOrdinal(dd)

		return mm + ' ' + dd + ', ' + yyyy
	}

	static getOrdinal(date){
		if(String(date).endsWith(1) && date!=11)return "st"
		else if(String(date).endsWith(2) && date!=12)return "nd"
		else if(String(date).endsWith(3) && date!=13)return "rd"
		else return "th"
	}

    static encodeAsParamUri(value){
		return encodeURIComponent(JSON.stringify(value))
	}
	
	static decodeFromParamUri(value){
		const decodeResult = decodeURIComponent(value)
		return JSON.parse(decodeResult)
	}

	static setToDigitFormat(num){
        let reversePrice = String(num).split("").reverse()
        let separator = 0
        let result = ""
        for(let i of reversePrice){
            if(separator==3){
                result += "."
                separator = 0
            }
            result += i
            separator++
        }
        return result.split("").reverse().join("")
    }

	    
    static getFromStorage(KEY, useDecode = false){
        let values = localStorage.getItem(KEY)
        if(values==null) return []
        if(useDecode) return values.split(",").map(value=> JSON.parse(decodeURIComponent(value)))
        return values.split(",")
    }

    static setToStorage(KEY, arr = []){
        localStorage.setItem(KEY, arr.join(","))
    }

    static addToStorage(KEY, value, useEncode){
        const useDecode = useEncode
        let list = this.getFromStorage(KEY, useDecode)
        list.push(useEncode ? encodeURIComponent(JSON.stringify(value)) : value)
        this.setToStorage(KEY, list)
    }
}