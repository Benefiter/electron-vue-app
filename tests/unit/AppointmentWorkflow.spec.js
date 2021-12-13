import { mount } from "@vue/test-utils";
import AppointmentWorkflow from "@/views/AppointmentWorkflow";
import AddAppointment from "@/components/AddAppointment";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { globalMocks } from "./mocks";

let sut;
let HeaderComponent;
let addAppointmentButton;

beforeEach(() => {
  sut = mount(AppointmentWorkflow, {
    global: globalMocks,
  });

  HeaderComponent = sut.findComponent(Header);
  addAppointmentButton = HeaderComponent.findComponent(Button);
});

test("Add Appointments card is hidden", () => {
  expect(HeaderComponent).toBeDefined();
  expect(addAppointmentButton).toBeDefined();
  expect(addAppointmentButton.props("text")).toEqual("Add Appointment");
  const addAppointmentCard = sut.findComponent(AddAppointment);
  expect(addAppointmentCard.exists()).toBeFalsy();
});

test("Add Appointments card is rendered when Add Appointment button is clicked", async () => {
  expect(HeaderComponent).toBeDefined();
  expect(addAppointmentButton).toBeDefined();
  expect(HeaderComponent.vm.appointmentworkflowPage).toBeTruthy();
  expect(addAppointmentButton.element.innerHTML).toBe("Add Appointment");
  await addAppointmentButton.trigger("click");
  expect(addAppointmentButton.props("text")).toEqual("Close");
  const addAppointmentCard = sut.findComponent(AddAppointment);
  expect(addAppointmentCard).toBeDefined();
  expect(addAppointmentCard.element.style.display).toBe("");
});
