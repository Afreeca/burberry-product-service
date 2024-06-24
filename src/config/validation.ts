import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  APP_PORT?: number;

  @IsNotEmpty()
  @IsString()
  APP_NAME?: string;

  @IsString()
  NODE_ENV?: string;

  @IsNotEmpty()
  @IsString()
  MONGO_ATLAS_USER?: string;

  @IsNotEmpty()
  @IsString()
  MONGO_ATLAS_PASSWORD?: string;

  @IsNotEmpty()
  @IsString()
  AUTH0_AUDIENCE?: string;

  @IsNotEmpty()
  @IsString()
  AUTH0_DOMAIN?: string;

  constructor(config: Partial<EnvironmentVariables>) {
    Object.assign(this, config);
  }
}

/**
 * Validate and transform the provided configuration object
 * @param config - The configuration object to validate.
 * @returns An instance of EnvironmentVariables with validated values.
 * @throws Error if there are validation errors.
 */
export function validate(config: Record<string, unknown>) {
  // convert the plain object to an instance of EnvironmentVariables class
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  // validate
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors?.length > 0) {
    throw new Error(
      `${errors.toString()} \n******** Please ensure that the .dev.env file is correctly created and configured.*****\n`,
    );
  }

  return validatedConfig;
}
