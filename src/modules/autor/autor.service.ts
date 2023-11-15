import { Injectable } from '@nestjs/common';
import { CreateAutorDto } from '../../../dto/create-autor.dto';
import { UpdateAutorDto } from '../../../dto/update-autor.dto';

@Injectable()
export class AutorService {
  create(createAutorDto: CreateAutorDto) {
    return 'This action adds a new autor' + createAutorDto;
  }

  findAll() {
    return `This action returns all autor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} autor`;
  }

  update(id: number, updateAutorDto: UpdateAutorDto) {
    return `This action updates a #${id} autor` + updateAutorDto;
  }

  remove(id: number) {
    return `This action removes a #${id} autor`;
  }
}
