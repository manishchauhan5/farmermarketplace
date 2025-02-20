import bcrypt from 'bcrypt';
export const hashPassword = async (password) => {
    try {
        const saltRound = 10;
        const hashPass = await bcrypt.hash(password, saltRound);
        return hashPass;
    } catch (error) {
        console.log("error in hashing password", error);
        throw error;
    }
}

export const comparePassword = async (password, hashPassword) => {
    try {
        return await bcrypt.compare(password, hashPassword);
    } catch (error) {
        console.log("error while comparing password", error);
        throw error;
    }
}