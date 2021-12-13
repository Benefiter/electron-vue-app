import { mount } from "@vue/test-utils";
import AppointmentWorkflow from "@/views/AppointmentWorkflow";
// import Appointments from "@/components/Appointments";
import AddAppointment from "@/components/AddAppointment";
import Header from "@/components/Header";
import Button from "@/components/Button";

const mockRoute = {
  fullPath: "/appointmentworkflow",
  path: "/appointmentworkflow",
};

const mockRouter = {
  push: jest.fn(),
};

test("Add Appointments card is hidden", () => {
  const sut = mount(AppointmentWorkflow, {
    global: {
      stubs: ["router-link", "router-view"],
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
    },
  });
  const header = sut.findComponent(Header);
  expect(header).toBeDefined();
  const addAppointmentButton = header.findComponent(Button);
  expect(addAppointmentButton).toBeDefined();
  expect(addAppointmentButton.props("text")).toEqual("Add Appointment");
  const addAppointmentCard = sut.findComponent(AddAppointment);
  expect(addAppointmentCard.exists()).toBeFalsy()
});

test("Add Appointments card is rendered when Add Appointment button is clicked", async () => {
  const sut = mount(AppointmentWorkflow, {
    global: {
      stubs: ["router-link", "router-view"],
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
    },
  });
  const header = sut.findComponent(Header);
  expect(header).toBeDefined();
  const addAppointmentButton = header.findComponent(Button);
  expect(addAppointmentButton).toBeDefined();
  expect(header.vm.appointmentworkflowPage).toBeTruthy();
  const baseButton = header.find(".btn");
  expect(baseButton).toBeDefined();
  expect(baseButton.element.innerHTML).toBe("Add Appointment");
  addAppointmentButton.trigger("click");
  await sut.vm.$nextTick();
  expect(addAppointmentButton.props("text")).toEqual("Close");
  const addAppointmentCard = sut.findComponent(AddAppointment);
  expect(addAppointmentCard).toBeDefined();
  expect(addAppointmentCard.element.style.display).toBe('')
});
