const mockRoute = {
  fullPath: "/appointmentworkflow",
  path: "/appointmentworkflow",
};

const mockRouter = {
  push: jest.fn().mockImplementation(() => {}),
};

export const globalMocks = {
  stubs: ["router-link", "router-view"],
  mocks: {
    $route: mockRoute,
    $router: mockRouter,
  },
};
