import { mount } from "@vue/test-utils";
import AddAppointment from "@/components/AddAppointment";
import moment from "moment";
import { appointmentValue, dayValue } from "./testData";

let sut;
let AppointmentInput;
let DayAndTimeInput;
let submitButton;
let onSubmitSpy;
let windowAlertSpy;

beforeEach(() => {
  sut = mount(AddAppointment, {});

  AppointmentInput = sut.find("input[placeholder='Add Appointment']");
  DayAndTimeInput = sut.find("input[placeholder='Add Day & Time']");
  submitButton = sut.find("button[type='submit']");
  onSubmitSpy = jest.spyOn(sut.vm, "onSubmit");
  windowAlertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  windowAlertSpy.mockReset();
});

test("Adding empty appointment triggers alert and no custom event", async () => {
  expect(AppointmentInput.exists()).toBeTruthy();
  expect(DayAndTimeInput.exists()).toBeTruthy();
  expect(submitButton.exists()).toBeTruthy();
  expect(submitButton.attributes("value")).toBe("Save Appointment");

  await AppointmentInput.setValue("");
  await sut.find("form").trigger("submit.prevent");

  const emitted = sut.emitted("add-appointment");
  expect(emitted).toBeFalsy();
  expect(onSubmitSpy).toBeCalledTimes(1);
  expect(windowAlertSpy).toBeCalledTimes(1);
});

test("Adding appointment does not trigger alert and triggers custom event with payload", async () => {
  expect(AppointmentInput.exists()).toBeTruthy();
  expect(DayAndTimeInput.exists()).toBeTruthy();
  expect(submitButton.exists()).toBeTruthy();
  expect(submitButton.attributes("value")).toBe("Save Appointment");

  await AppointmentInput.setValue(appointmentValue);
  await DayAndTimeInput.setValue(dayValue);
  await sut.find("form").trigger("submit.prevent");

  const emitted = sut.emitted("add-appointment");
  expect(emitted.length).toBe(1);
  expect(emitted[0][0]).toStrictEqual({
    text: appointmentValue,
    day: moment(dayValue).format(`ddd MMM D Y hh:mm a`),
    timestamp: moment(dayValue),
    completed: false,
  });
  expect(onSubmitSpy).toBeCalledTimes(1);
  expect(windowAlertSpy).toBeCalledTimes(0);
});
