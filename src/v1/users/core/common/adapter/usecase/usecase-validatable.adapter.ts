import { Code } from '../../code/code';
import { Exception } from '../../exception/Exception';
import { Optional } from '../../type/common-types';
import {
  ClassValidationDetails,
  ClassValidator,
} from '../../util/class-validator/ClassValidator';

export class UseCaseValidatableAdapter {
  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> =
      await ClassValidator.validate(this);
    if (details) {
      throw Exception.new({
        code: Code.USE_CASE_PORT_VALIDATION_ERROR,
        data: details,
      });
    }
  }
}
