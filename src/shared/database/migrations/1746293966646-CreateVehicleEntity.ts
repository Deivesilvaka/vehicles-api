import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVehicleEntity1746293966646 implements MigrationInterface {
    name = 'CreateVehicleEntity1746293966646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`id\` varchar(36) NOT NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`plate\` varchar(8) NOT NULL, \`chasis\` varchar(17) NOT NULL, \`renavam\` varchar(11) NOT NULL, \`model\` varchar(50) NOT NULL, \`brand\` varchar(50) NOT NULL, \`year\` varchar(4) NOT NULL, UNIQUE INDEX \`IDX_ec7181ebdab798d97070122a5b\` (\`plate\`), UNIQUE INDEX \`IDX_ba2cf6a9e252e056c4b70dc685\` (\`chasis\`), UNIQUE INDEX \`IDX_f20513b1dd64f0b2da6f91ef54\` (\`renavam\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f20513b1dd64f0b2da6f91ef54\` ON \`vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_ba2cf6a9e252e056c4b70dc685\` ON \`vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec7181ebdab798d97070122a5b\` ON \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
    }

}
