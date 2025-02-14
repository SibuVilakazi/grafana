import { updateOrganization, setUserOrganization } from './actions';
import { updateConfigurationSubtitle } from 'app/core/actions';
import { thunkTester } from 'test/core/thunk/thunkTester';

const setup = () => {
  const initialState = {
    organization: {
      organization: {
        id: 1,
        name: 'New Org Name',
      },
    },
  };

  return {
    initialState,
  };
};

describe('updateOrganization', () => {
  describe('when updateOrganization thunk is dispatched', () => {
    const getMock = jest.fn().mockResolvedValue({ id: 1, name: 'New Org Name' });
    const putMock = jest.fn().mockResolvedValue({ id: 1, name: 'New Org Name' });
    const backendSrvMock: any = {
      get: getMock,
      put: putMock,
    };

    it('then it should dispatch updateConfigurationSubtitle', async () => {
      const { initialState } = setup();

      const dispatchedActions = await thunkTester(initialState)
        .givenThunk(updateOrganization)
        .whenThunkIsDispatched({ getBackendSrv: () => backendSrvMock });

      expect(dispatchedActions[0].type).toEqual(updateConfigurationSubtitle.type);
      expect(dispatchedActions[0].payload).toEqual(initialState.organization.organization.name);
    });
  });
});

describe('setUserOrganization', () => {
  describe('when setUserOrganization thunk is dispatched', () => {
    const postMock = jest.fn().mockResolvedValue({ id: 1, name: 'New Org Name' });

    const backendSrvMock: any = {
      post: postMock,
    };

    const orgId = 1;

    it('then it should dispatch updateConfigurationSubtitle', async () => {
      const { initialState } = setup();

      const dispatchedActions = await thunkTester(initialState)
        .givenThunk(setUserOrganization)
        .whenThunkIsDispatched(orgId, { getBackendSrv: () => backendSrvMock });

      expect(dispatchedActions[0].type).toEqual(updateConfigurationSubtitle.type);
      expect(dispatchedActions[0].payload).toEqual(initialState.organization.organization.name);
    });
  });
});
