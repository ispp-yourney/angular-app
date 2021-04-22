import { environment as environment_ci} from "./environment-ci";
import { environment } from "./environment";
import { environment as environment_prod} from "./environment.prod";

describe('App', () => {




  it('should use environments', () => {
    expect(environment).toBeTruthy()
    expect(environment_ci).toBeTruthy()
    expect(environment_prod).toBeTruthy()
  });

 

})

