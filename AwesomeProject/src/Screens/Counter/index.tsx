import React, { useState } from 'react';
import Styled from 'styled-components/native';
import Button from '~/Components/Button';

const Container = Styled.SafeAreaView`
    flex: 1;
`;

const TitleContainer = Styled.Text`
    flex: 1;
    justify-content: center;
    align-items:center;
`;


const TitleLabel = Styled.Text`
    font-size:24px;
`;


const CountContainer = Styled.View`
    flex:2;
    justify-content: center;
    align-items: center;
`;


const CountLabel = Styled.Text`
    font-size:24px;
    font-weight: bold;
`;
const ButtonContainer = Styled.View`
    flex:1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

interface Props {
    title?: string;
    initValue: number;
}

interface State {
    count: number;
    error: Boolean;
}


class Counter extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        console.log('constructor');

        this.state = {
            count: props.initValue,
            error: false
        };
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        console.log("getDerivedStateFromProps")
        return null
    }

    componentDidMount() {
        console.log("componentDidMount")
    }

    getSnapshotBeforeUpdate(prevProps:Props, prevState:State) {
        console.log("getSnapshotBeforeUpdate")

        return {
            testData: true
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State, snapshot: ISanpshot) {
        console.log('componentDidUpdate')
    }

    shouldComponentUpdate(nextProps: Props, nextState: State){
        console.log('shouldComponentUpdate')
        return true;
    }

    componentWillMount() {
        console.log('componentWillMount')
 
    }

    componentDidCatch(error:Error, info:React.ErrorInfo) {
        this.setState({
            error:true
        })
    }


    
    render() {
        const { title } = this.props;
        const { count, error } = this.state;

        return (
            <Container>
                {
                    !error && (
                        <>
                            {title && (
                                <TitleContainer>
                                    <TitleLabel>{title}</TitleLabel>
                                </TitleContainer>
                            )}
                            <CountContainer>
                                <CountLabel>{count}</CountLabel>
                            </CountContainer>
                            <ButtonContainer>
                                <Button iconName='plus' onPress={()=> this.setState({count:count+1})} />
                                <Button iconName='minus' onPress={()=> this.setState({count: count-1})} />
                            </ButtonContainer>
                        </>
                    )
                }
            </Container>
        )
    }
    
}

export default Counter;