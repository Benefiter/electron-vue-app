import { mount } from "@vue/test-utils";
import Appointment from "@/components/Appointment";
import { propsData } from "./testData";

let sut;
let containerDiv;
let deleteDiv;

beforeEach(() => {
  sut = mount(Appointment, {
    propsData,
  });

  containerDiv = sut.find("div[class='pending'");
  deleteDiv = sut.find("div#delete");
});

test("Double click on appointment emits toggle-completed event for appointment id", async () => {
  expect(containerDiv.exists()).toBeTruthy();

  await containerDiv.trigger("dblclick");

  const emitted = sut.emitted("toggle-completed");
  expect(emitted.length).toBe(1);
  expect(emitted[0][0]).toBe(propsData.appointment.id);
});

test("Clicking delete appointment icon emits delete-appointment event for appointment id", async () => {
  expect(deleteDiv.exists()).toBeTruthy();

  await deleteDiv.trigger("click");

  const emitted = sut.emitted("delete-appointment");
  expect(emitted.length).toBe(1);
  expect(emitted[0][0]).toBe(propsData.appointment.id);
});
