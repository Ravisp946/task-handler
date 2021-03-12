import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'bigint', name: 'assignor_id' })
    assignorId: string;

    @Column({ type: 'bigint', name: 'assignee_id' })
    assigneeId: string;

    @Column({ type: 'text', name: 'title' })
    title: string;

    @Column({ type: 'text', name: 'description', nullable: true })
    description?: string;

    @Column({ type: 'text', name: 'jira_id', nullable: true })
    jiraId?: string;

    @Column({ type: 'text', name: 'status', default: 'TO-DO' })
    status: 'TO-DO' | 'IN PROGRESS' | 'DONE';

    @Column({ type: 'text', name: 'time_estimate' })
    timeEstimate: string; 
}