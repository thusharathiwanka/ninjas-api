import { Injectable } from '@nestjs/common';

import { ninjas } from 'src/utils/ninjas.util';
import { NinjaCreateDto } from './dto/ninja-create.dto';
import { NinjaUpdateDto } from './dto/ninja-update.dto';
import { NinjaEntity } from './entities/ninja.entity';

@Injectable()
export class NinjaService {
  private ninjas: NinjaEntity[];

  constructor() {
    this.ninjas = ninjas;
  }

  getNinjas(): NinjaEntity[] {
    return this.ninjas;
  }

  getNinjasByWeapon(weapon: string): NinjaEntity[] {
    if (weapon) return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    return this.ninjas;
  }

  getNinjaById(id: string): NinjaEntity {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);

    if (!ninja) throw new Error(`Ninja not found with id of ${id}`);

    return ninja;
  }

  createNinja(ninja: NinjaCreateDto): NinjaEntity {
    const newNinja = { id: Date.now().toString(), ...ninja };

    this.ninjas.push(newNinja);

    return newNinja;
  }

  updateNinja(id: string, updateNinja: NinjaUpdateDto): NinjaEntity {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) return { ...ninja, ...updateNinja };

      return ninja;
    });

    return this.getNinjaById(id);
  }

  deleteNinja(id: string): NinjaEntity {
    const toBeDeleted = this.getNinjaById(id);
    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

    return toBeDeleted;
  }
}
