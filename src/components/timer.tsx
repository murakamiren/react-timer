import {
	Box,
	Center,
	CircularProgress,
	CircularProgressLabel,
	HStack,
	Icon,
	IconButton,
	Input,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { FC, useRef, useState } from "react";
import { calcProgress } from "../feature/calcProgress";
import { useInterval } from "../hooks/useInterval";
import { IoPause, IoPlay, IoStop } from "react-icons/io5";

const Timer: FC = () => {
	const [time, setTime] = useState<number>(0);
	const maxTime = useRef<number>(0);
	const [isStart, setIsStart] = useState<boolean>(false);
	const [isPause, setIsPause] = useState<boolean>(false);
	const [isRunning, setIsRunning] = useState<boolean>(false);
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
				setIsRunning(true);
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

	const stopTimer = () => {
		setIsPause(false);
		setIsStart(false);
		setIsRunning(false);
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
				<HStack spacing={8}>
					<Center flexDir="column">
						<IconButton
							variant="outline"
							rounded="full"
							colorScheme="whatsapp"
							aria-label="start"
							icon={<Icon as={IoPlay} w={6} h={6} />}
							onClick={startTimer}
							disabled={isRunning}
						/>
						<Text fontSize="sm">start</Text>
					</Center>
					<Center flexDir="column">
						<IconButton
							variant="outline"
							rounded="full"
							colorScheme="facebook"
							aria-label={isPause ? "play" : "pause"}
							icon={isPause ? <Icon as={IoPlay} w={6} h={6} /> : <Icon as={IoPause} w={6} h={6} />}
							onClick={pauseTimer}
							disabled={!isRunning}
						/>
						<Text fontSize="sm">{isPause ? "play" : "pause"}</Text>
					</Center>
					<Center flexDir="column">
						<IconButton
							variant="outline"
							rounded="full"
							colorScheme="red"
							aria-label="stop"
							icon={<Icon as={IoStop} w={6} h={6} />}
							onClick={stopTimer}
							disabled={!isRunning}
						/>
						<Text fontSize="sm">stop</Text>
					</Center>
				</HStack>
			</VStack>
		</Box>
	);
};

export default Timer;
