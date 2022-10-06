import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  
  private readonly logger = new Logger('CategoriaService')

  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>
  ) { }


  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const categoria = this.categoriaRepository.create(createCategoriaDto)
      await this.categoriaRepository.save(categoria)

      return categoria

    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Error al crear una nueva categoria')
    }
  }

  findAll() {
    return this.categoriaRepository.find({})
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOneBy({ id })

    if (!categoria)
      throw new NotFoundException(`No existe una categoria con id = ${id}`)

    return categoria
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {

    const categoria = await this.categoriaRepository.preload({
      id: id, //va a buscar el objeto por este id y luego va a colocar todas las propiedades que tengamos en nuestro updatelibrodto
      ...updateCategoriaDto
    })

    if (!categoria)
      throw new NotFoundException(`No existe una categoria con id = ${id}`)

    return this.categoriaRepository.save(categoria)
  }

  async remove(id: number) {
    const categoria = await this.findOne(id)

    if (!categoria)
      return new NotFoundException(`No existe una categoria con id = ${id}`)

    return await this.categoriaRepository.update({
        id: id
      }, {
        activo: false
    })
  }
}
