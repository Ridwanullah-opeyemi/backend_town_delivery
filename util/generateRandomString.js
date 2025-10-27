import crypto from "crypto"

const generateRandomString = (num = 8)=>{
    const token = crypto.randomBytes(num).toString("hex")
    return token
}

export default generateRandomString
