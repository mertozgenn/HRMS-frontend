import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, Table, Button, Menu, Grid, Modal } from 'semantic-ui-react'
import JobAdvertService from '../services/jobAdvertService'
import JobAdvertFilter from './JobAdvertFilter'

export default function JobAdvertList({ mobile }) {

    const [jobAdverts, setjobAdverts] = useState([])
    const [pages, setPages] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.getallByActiveAndApprovedSortedByDate(1, pageSize).then(result => setjobAdverts(result.data.data))

        jobAdvertService.getPageCount(pageSize).then(result => {
            let pageCount = result.data.data
            let pages = []
            for (let index = 1; index <= pageCount; index++) {
                pages.push(index);
            }
            setPages(pages)
        })
    }, [pageSize])

    function handleChangePage(pageNo) {
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.getallByActiveAndApprovedSortedByDate(pageNo, pageSize).then(result => setjobAdverts(result.data.data))
    }

    function handleChangePageSize(pageSizeToChange) {
        setPageSize(pageSizeToChange)
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.getallByActiveAndApprovedSortedByDate(1, pageSizeToChange).then(result => setjobAdverts(result.data.data))

        jobAdvertService.getPageCount(pageSizeToChange).then(result => {
            let pageCount = result.data.data
            let pages = []
            for (let index = 1; index <= pageCount; index++) {
                pages.push(index);
            }
            setPages(pages)
        })
    }

    function handleOpen() {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    return (
        <div>
            {mobile === true &&
            <Button color="grey" onClick={()=> handleOpen()}>
                Filtrele
            </Button>
            }
            <Modal open={open} onClose={()=>handleClose()} closeIcon closeOnDimmerClick closeOnTriggerClick closeOnTriggerBlur>
                    <JobAdvertFilter setjobAdverts={setjobAdverts} jobAdverts={jobAdverts} pageSize={pageSize} handleChangePageSize={handleChangePageSize} />
            </Modal>

            <Grid padded>
                <Grid.Row>
                    {mobile === false &&
                        <Grid.Column width="4">
                            <JobAdvertFilter setjobAdverts={setjobAdverts} jobAdverts={jobAdverts} pageSize={pageSize} handleChangePageSize={handleChangePageSize} />
                        </Grid.Column>}
                    <Grid.Column width={mobile === false ? "12" : "16"}>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>??irket</Table.HeaderCell>
                                    <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                                    <Table.HeaderCell>A????k Pozisyon</Table.HeaderCell>
                                    <Table.HeaderCell>Yay??n Tarihi</Table.HeaderCell>
                                    <Table.HeaderCell>Son Ba??vuru Tarihi</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {
                                    jobAdverts.map(jobAdvert => (
                                        <Table.Row key={jobAdvert.id}>
                                            <Table.Cell>{jobAdvert.employer.companyName}</Table.Cell>
                                            <Table.Cell>{jobAdvert.position.name}</Table.Cell>
                                            <Table.Cell>{jobAdvert.openPosition}</Table.Cell>
                                            <Table.Cell>{jobAdvert.publishingDate.substring(0, 10)}</Table.Cell>
                                            <Table.Cell>{jobAdvert.applicationDeadline.substring(0, 10)}</Table.Cell>
                                            <Table.Cell>
                                                <Button primary as={NavLink} to={`/jobadverts/${jobAdvert.id}`} animated>
                                                    <Button.Content visible>Detaya Git</Button.Content>
                                                    <Button.Content hidden>
                                                        <Icon name='arrow right' />
                                                    </Button.Content>
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='6'>
                                        <Menu floated='right' pagination>
                                            <Menu.Item as='a' icon>
                                                <Icon name='chevron left' />
                                            </Menu.Item>
                                            {
                                                pages.map(page => (
                                                    <Menu.Item key={page} onClick={() => { handleChangePage(page) }} as='a'>{page}</Menu.Item>
                                                ))
                                            }
                                            <Menu.Item as='a' icon>
                                                <Icon name='chevron right' />
                                            </Menu.Item>
                                        </Menu>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
