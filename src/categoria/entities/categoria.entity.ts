import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Libro } from '../../libro/entities/libro.entity';

@Entity()
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    nombre: string

    @Column('bit',{
        default: true
    })
    activo?: boolean

    @OneToMany(
        () => Libro,
        (libros: Libro) => libros.categoria
    )
    libros: Libro[]
}
