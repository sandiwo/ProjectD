import {Get, Post, Patch, Delete, GetBlob} from './methods'

const findPetugasById = (id) => Get(`petugas/find/${id}`);
const getAllPetugas = () => Get('petugas');
const savePetugas = (data) => Post('petugas/store', data);
const updatePetugas = (data, id) => Patch(`petugas/update/${id}`, data);

const ServicePetugas = {
  findPetugasById,
  getAllPetugas,
  savePetugas,
  updatePetugas
}

export default ServicePetugas