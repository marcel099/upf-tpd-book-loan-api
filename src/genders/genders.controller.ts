import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';

import { GendersService } from './genders.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { GenderEntity } from './entities/gender.entity';
import { TransformToSimpleGenderInterceptor } from './interceptor/transform-to-simple-gender.interceptor';

@Controller('genders')
@ApiTags('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Post()
  @ApiCreatedResponse({ type: GenderEntity })
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.gendersService.create(createGenderDto);
  }

  @Get()
  @ApiOkResponse({ type: GenderEntity, isArray: true })
  findAll() {
    return this.gendersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: GenderEntity })
  findOne(@Param('id') id: string) {
    return this.gendersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: GenderEntity })
  update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    return this.gendersService.update(id, updateGenderDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: GenderEntity })
  remove(@Param('id') id: string) {
    return this.gendersService.remove(id);
  }
}
