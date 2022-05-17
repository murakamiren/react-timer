import { useEffect } from "react";

type useIntervalProps = {
	onUpdate: () => void;
	isStart: boolean;
	onProgress: () => void;
};

export const useInterval = ({ onUpdate, isStart, onProgress }: useIntervalProps) => {
	useEffect(() => {
		if (isStart) {
			const timerId = setInterval(() => {
				onUpdate();
				onProgress();
			}, 1000);
			return () => clearInterval(timerId);
		}
	}, [isStart, onProgress]);
};
