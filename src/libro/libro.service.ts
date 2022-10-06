import { Injectable, InternalServerErrorException, Logger, NotFoundException, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';

@Injectable()
export class LibroService {

  private readonly logger = new Logger('LibroService')

  constructor(
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>
  ) { }


  async create(createLibroDto: CreateLibroDto) {
    try {
      const libro = this.libroRepository.create(createLibroDto)
      await this.libroRepository.save(libro)

      return libro

    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Error al crear un nuevo libro')
    }
  }

  findAll() {
    return this.libroRepository.find({})
  }

  async findOne(id: number) {
    const libro = await this.libroRepository.findOneBy({ id })

    if (!libro)
      throw new NotFoundException(`No existe un libro con id = ${id}`)

    return libro
  }

  async update(id: number, updateLibroDto: UpdateLibroDto) {

    const libro = await this.libroRepository.preload({
      id: id, 
      ...updateLibroDto
    })

    if (!libro)
      throw new NotFoundException(`No existe un libro con id = ${id}`)

    return this.libroRepository.save(libro)
  }

  async remove(id: number) {
    const libro = await this.findOne(id)

    if (!libro)
      return new NotFoundException(`No existe un libro con id = ${id}`)

    return await this.libroRepository.update({
        id: id
      }, {
        activo: false
    })
  }
}


