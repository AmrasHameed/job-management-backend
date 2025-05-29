/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { Job } from './jobs.entity';
import { CreateJobDto } from './create-job.dto';
import { JobFiltersDto } from './filter-jobs.dto';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create(createJobDto );
    return this.jobRepository.save(job);
  }

  async getJobs(filters: JobFiltersDto): Promise<Job[]> {
  const { searchQuery, location, jobType, minSalary ,maxSalary } = filters;

  const where: any = {};

  if (searchQuery) {
    where.title = ILike(`%${searchQuery}%`);
  }

  if (location) {
    where.location = ILike(`%${location}%`);
  }

  if (jobType) {
    where.job_type = ILike(jobType);;
  }
  if (minSalary && maxSalary) {
    console.log(minSalary,maxSalary)
    where.salary_range = Between(minSalary,maxSalary);
  }

  return this.jobRepository.find({ where });
}

}
