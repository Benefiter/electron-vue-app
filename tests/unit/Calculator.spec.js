import { mount } from "@vue/test-utils";
import ReduxCalcButton from "@/components/reduxcalculator/ReduxCalcButton";
import ReduxCalcOperand from "@/components/reduxcalculator/ReduxCalcOperand";
import Calculator from "@/views/Calculator"
import { state } from "@/store/state";
import { mutations } from "@/store/mutations";
import Vuex from "vuex";
import { cloneDeep } from 'lodash';

let sut;

let calculatorOperands
let calculatorButtons

let calculatorNumberButton1
let calculatorNumberButton9
let calculatorAddOperatorButton
let calculatorMinusOperatorButton
let calculatorEqualsButton
let calculatorACButton
let calculatorDELButton
let calculatorDecimalButton

let calcPrevOperand
let calcOperand

let store;

beforeEach(() => {
  store = new Vuex.Store({
    state: cloneDeep(state),
    mutations,
  });

  sut = mount(Calculator, {
    global: {
      mocks: {
        $store: store,
      },
    },
  });

  calculatorOperands = sut.findAllComponents(ReduxCalcOperand)
  calculatorButtons = sut.findAllComponents(ReduxCalcButton)

  calculatorNumberButton1  = calculatorButtons.find(b => b.props('text') === '1')
  calculatorNumberButton9 = calculatorButtons.find(b => b.props('text') === '9')
  calculatorAddOperatorButton = calculatorButtons.find(b => b.props('text') === '+')
  calculatorMinusOperatorButton = calculatorButtons.find(b => b.props('text') === '-')
  calculatorEqualsButton = calculatorButtons.find(b => b.props('text') === '=')
  calculatorACButton = calculatorButtons.find(b => b.props('text') === 'AC')
  calculatorDELButton = calculatorButtons.find(b => b.props('text') === 'Del')
  calculatorDecimalButton = calculatorButtons.find(b => b.props('text') === '.')

  calcOperand = calculatorOperands[0]
  calcPrevOperand = calculatorOperands[1]
});

test("Calculator button count and test setup is as expected", async () => {
  expect(calculatorOperands.length).toEqual(2)
  expect(calculatorButtons.length).toEqual(18)

  expect(calculatorNumberButton1.exists()).toBeTruthy()
  expect(calculatorNumberButton9.exists()).toBeTruthy()
  expect(calculatorAddOperatorButton.exists()).toBeTruthy()
  expect(calculatorMinusOperatorButton.exists()).toBeTruthy()
  expect(calculatorEqualsButton.exists()).toBeTruthy()
  expect(calculatorACButton.exists()).toBeTruthy()
  expect(calculatorDELButton.exists()).toBeTruthy()
  expect(calculatorDecimalButton.exists()).toBeTruthy()

  expect(calcPrevOperand.exists()).toBeTruthy()
  expect(calcOperand.exists()).toBeTruthy()
});

test("11+99-1= result in correct store state", async () => {
  await calculatorNumberButton1.trigger('click')
  await calculatorNumberButton1.trigger('click')

  expect(store.state.operand).toEqual('11');
  expect(store.state.prevOperand).toEqual('');
  expect(store.state.currentOperation).toEqual('');

  await calculatorAddOperatorButton.trigger('click')

  expect(store.state.currentOperation).toEqual('+');

  await calculatorNumberButton9.trigger('click')
  await calculatorNumberButton9.trigger('click')

  expect(store.state.operand).toEqual('99');
  expect(store.state.prevOperand).toEqual('11 +');
  expect(store.state.currentOperation).toEqual('+');

  await calculatorMinusOperatorButton.trigger('click')

  expect(store.state.operand).toEqual('');
  expect(store.state.prevOperand).toEqual('110 -');
  expect(store.state.currentOperation).toEqual('-');

  await calculatorNumberButton1.trigger('click')

  expect(store.state.operand).toEqual('1');
  expect(store.state.prevOperand).toEqual('110 -');
  expect(store.state.currentOperation).toEqual('-');


  await calculatorEqualsButton.trigger('click')

  expect(store.state.operand).toEqual('109');
  expect(store.state.prevOperand).toEqual('');
  expect(store.state.currentOperation).toEqual('');
});

test("11Del result in correct store state", async () => {
  await calculatorNumberButton1.trigger('click')
  await calculatorNumberButton1.trigger('click')

  expect(store.state.operand).toEqual('11');
  expect(store.state.prevOperand).toEqual('');
  expect(store.state.currentOperation).toEqual('');

  await calculatorDELButton.trigger('click')

  expect(store.state.operand).toEqual('1');
  expect(store.state.prevOperand).toEqual('');
  expect(store.state.currentOperation).toEqual('');
});

test("11AC result in correct store state", async () => {
  await calculatorNumberButton1.trigger('click')
  await calculatorNumberButton1.trigger('click')

  expect(store.state.operand).toEqual('11');
  expect(store.state.prevOperand).toEqual('');
  expect(store.state.currentOperation).toEqual('');

  await calculatorACButton.trigger('click')

  expect(store.state.operand).toEqual('');
  expect(store.state.prevOperand).toEqual('');
  expect(store.state.currentOperation).toEqual('');
});

test("Multiple consecutive decimal buttons are ignored", async () => {
  await calculatorNumberButton1.trigger('click')
  await calculatorNumberButton1.trigger('click')
  await calculatorDecimalButton.trigger('click')
  await calculatorDecimalButton.trigger('click')
  await calculatorDecimalButton.trigger('click')
  await calculatorDecimalButton.trigger('click')
  await calculatorDecimalButton.trigger('click')

  expect(store.state.operand).toEqual('11.');
  expect(store.state.prevOperand).toEqual('');
  expect(store.state.currentOperation).toEqual('');
});
