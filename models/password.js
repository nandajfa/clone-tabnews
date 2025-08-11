import bcryptjs from 'bcryptjs'

async function hash(password){
	const rounds = getNumberOfRounds();
	const pepper = process.env.PEPPER
	const passWithPepper = password + pepper

	return await bcryptjs.hash(passWithPepper, rounds)
}

function getNumberOfRounds(){
	return process.env.NODE_ENV === 'production' ? 14 : 1;
}

async function compare(providedPassword, storePassword){
	const pepper = process.env.PEPPER
	const passWithPepper = providedPassword + pepper

	return await bcryptjs.compare(passWithPepper, storePassword)
}

const password =  {
	hash,
	compare
}

export default password;