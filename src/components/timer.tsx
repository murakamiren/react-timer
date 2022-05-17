import {
	Box,
	Button,
	Center,
	CircularProgress,
	CircularProgressLabel,
	HStack,
	Input,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { FC, useRef, useState } from "react";
import { calcProgress } from "../feature/calcProgress";
import { useInterval } from "../hooks/useInterval";

const Timer: FC = () => {
	const [time, setTime] = useState<number>(0);
	const maxTime = useRef<number>(0);
	const [isStart, setIsStart] = useState<boolean>(false);
	const [isPause, setIsPause] = useState<boolean>(false);
	const [calcProgressNum, setCalcProgressNum] = useState<number>(0);
	const inputEl = useRef<HTMLInputElement | null>(null);
	const toast = useToast();

	const startTimer = () => {
		setIsPause(false);
		if (inputEl.current) {
			if (inputEl.current.value) {
				const inputVal = inputEl.current.value;
				setTime(parseInt(inputVal));
				maxTime.current = parseInt(inputVal);
				setIsStart(true);
			} else {
				toast({
					title: "pls set number",
					status: "error",
					duration: 2000,
					isClosable: true,
					position: "bottom",
				});
			}
		}
	};

	const pauseTimer = () => {
		setIsPause((pre) => !pre);
		setIsStart((pre) => !pre);
	};

	const removeTimer = () => {
		setIsPause(false);
		setIsStart(false);
		setTime(0);
	};
	useInterval({
		onUpdate: () => setTime((pre) => pre - 1),
		isStart,
		onProgress: () => setCalcProgressNum(() => calcProgress(maxTime.current, time)),
	});
	return (
		<Box>
			<VStack spacing={4}>
				<CircularProgress value={calcProgressNum} size="240px" thickness="5px" color="whatsapp.500">
					<CircularProgressLabel>{time}s</CircularProgressLabel>
				</CircularProgress>
				<Input placeholder="set time(second)" w="1/3" ref={inputEl} />
				<HStack spacing={3}>
					<Button onClick={startTimer} colorScheme="whatsapp">
						start
					</Button>
					<Button onClick={pauseTimer} colorScheme="facebook">
						{isPause ? "play" : "pause"}
					</Button>
					<Button onClick={removeTimer} colorScheme="red">
						remove
					</Button>
				</HStack>
			</VStack>
		</Box>
	);
};

export default Timer;
