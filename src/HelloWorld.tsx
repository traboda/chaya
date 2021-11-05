import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const StyledDiv = styled.div`
  background: #444;
  border-radius: 7px;
  padding: 1rem 1.5rem;
  margin: 1rem 0;
`;

const HelloWorld = ({ initialValue = 0 }) => {
    const [counter, setCounter] = useState(initialValue);

    useEffect(() => {
        console.log(initialValue, counter);
    }, [counter]);

    return (
        <StyledDiv onClick={() => setCounter(counter + 1)}>
            This works? {counter}
        </StyledDiv>
    )
}

export default HelloWorld;