export const calcProgress = (maxNum: number, currentNum: number) => {
	const calcNum = (currentNum / maxNum) * 100;

	return calcNum;
};
