import { Center, Heading } from "@chakra-ui/react";
import Timer from "./components/timer";

function App() {
	return (
		<div>
			<Center my={12}>
				<Heading>react timer</Heading>
			</Center>
			<Timer />
		</div>
	);
}

export default App;
