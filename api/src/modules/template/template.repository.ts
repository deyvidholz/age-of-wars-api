import { getConnection } from 'typeorm';
import { Template } from './template.entity';

export function templateRepository() {
  return getConnection().getRepository(Template);
}
