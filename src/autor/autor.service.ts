import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { Autor } from './entities/autor.entity';

@Injectable()
export class AutorService {

  private readonly logger = new Logger('AutorService')

  constructor(
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>
  ) { }

  async create(createAutorDto: CreateAutorDto) {
    try {
      const autor = this.autorRepository.create(createAutorDto)
      await this.autorRepository.save(autor)

      return autor

    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Error al crear nuevo autor')
    }
  }

  findAll() {
    return this.autorRepository.find({})
  }

  async findOne(id: number) {
    const autor = await this.autorRepository.findOneBy({ id })

    if (!autor)
      throw new NotFoundException(`No existe un autor con id: ${id}`)

    return autor
  }

  async update(id: number, updateAutorDto: UpdateAutorDto) {
    const autor = await this.autorRepository.preload({
      id: id,
      ...updateAutorDto
    })

    if (!autor)
      throw new NotFoundException(`No existe un autor con id = ${id}`)

    return this.autorRepository.save(autor)
  }

  async remove(id: number) {
    const autor = await this.findOne(id)

    if (!autor)
      return new NotFoundException(`No existe un autor con id = ${id}`)

    return await this.autorRepository.update({
      id: id
    }, {
      activo: false
    })
  }
}
