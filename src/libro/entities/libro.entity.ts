import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Autor } from '../../autor/entities/autor.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity()
export class Libro {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    nombre: string

    @Column('float', {
        default: 0
    })
    precio: number

    @CreateDateColumn()
    FechaIngreso?: Date

    @Column('bit', {
        default: true
    })
    activo?: boolean

    @ManyToOne(
        () => Autor,
        (autor: Autor) => autor.libros

    )
    autor:Autor


    @ManyToOne(
        () => Categoria,
        (categoria: Categoria) => categoria.libros
    )
    categoria: Categoria

}
