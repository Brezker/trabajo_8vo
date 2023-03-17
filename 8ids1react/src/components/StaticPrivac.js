import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Accordion, AccordionTab } from 'primereact/accordion';
        

const StaticPrivac = () => {
const endpoint = 'http://127.0.0.1:8000/api';

let navigate = useNavigate();

function navigateTo(string){
  navigate(string);
}

const irHome = async (e) => {
  navigateTo('/')
}

const end = <Button label="Home" severity="info" icon="pi pi-user" iconPos="right" onClick={irHome}/>;

return (
    <div>
      <div className="card">
      <Menubar end={end} />
      </div>
      <div>
      <Card title="Aviso de Privacidad">
          <p className="m-0">
          En (nombre de la empresa) la información y datos personales de los usuarios, colaboradores y empleados es tratada de forma estrictamente confidencial y con la secrecía necesaria para lograr los fines de la organización, por lo que hacemos un esfuerzo permanente para salvaguardarla, en conformidad con los artículos 8, 15, 16 y 36 de la Ley Federal de Protección de Datos Personales en Posesión de Particulares.
          </p>
          <p className="m-0">
          (La organización), es una asociación sin fines de lucro, enfocada a (a que se dedica). Nuestra misión es (colocar misión).
          </p>
          <p className="m-0">
          En concordancia con el derecho a la protección de datos personales en posesión de particulares, consagrado en el artículo 6 de la constitución política de los estados unidos mexicanos, así como en cumplimiento a las disposiciones de la ley federal de protección de datos personales en posesión de los particulares, y en base los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad; (empresa), con domicilio en (), es responsable de recabar y proteger los datos personales, así como del uso que se le dé a los mismos.
          </p>
          <p className="m-0">
          Si el titular de los datos personales no acepta en forma absoluta y completa los términos y condiciones de este aviso, deberá abstenerse de compartir cualquier tipo de información a la (empresa) por cualquier medio físico, óptico y/o electrónico.
          </p>
      </Card>
      </div>
      <div>
        <div className="card">
          <Accordion activeIndex={0}>
            <AccordionTab header="Los datos personales son utilizados para las siguientes finalidades:">
                <p className="m-0">
                En la comunicación con terceros, con fines estadísticos y administrativos.
                </p>
                <p className="m-0">
                Para el registro de los beneficios y obligaciones establecidas por las leyes mexicanas, así como para fines administrativos, de desarrollo y estadísticos, relacionado con nuestros trabajadores.
                </p>
                <p className="m-0">
                Los datos personales son utilizados de manera interna.
                </p>
                <p className="m-0">
                Adicionalmente a lo anterior, los datos personales de los diferentes grupos de interés de la (empresa), serán tratados en general para mantener una fluida comunicación con ellos a través del envío de información y llevar a cabo trámites administrativos.
                </p>
            </AccordionTab>
            <AccordionTab header="Datos personales recabados">
                <p className="m-0">
                Para los fines citados, (empresa) requiere obtener los siguientes datos personales:
                </p>
                <p className="m-0">
                De los estudiantes:
                </p>
                <p className="m-0">
                Nombre completo
                </p>
                <p className="m-0">
                Edad
                </p>
                <p className="m-0">
                Sexo
                </p>
                <p className="m-0">
                Otro tipo de información específica, de acuerdo a las necesidades de las diferentes áreas y conforme a los fines de la organización.
                </p>
                <p className="m-0">
                De los profesores:
                </p>
                <p className="m-0">
                Nombre completo
                </p>
                <p className="m-0">
                Edad
                </p>
                <p className="m-0">
                Sexo
                </p>
                <p className="m-0">
                Cedula
                </p>
                <p className="m-0">
                Otro tipo de información específica, de acuerdo a las necesidades de las diferentes áreas y conforme a los fines de la organización.
                </p>
            </AccordionTab>
            <AccordionTab header="Manejo de datos personales sensible">
                <p className="m-0">
                Algunos de los datos recabados que se mencionan en los incisos antes citados, son considerados como sensibles, por lo que el uso y tratamiento de los mismos por parte de la organización, se hace con el más estricto control, confidencialidad y secrecía necesarios para la proveeduría, protección y bienestar de nuestra población de interés, dicho manejo de los datos personales y los datos personales sensibles es necesario para lograr las finalidades legítimas, concretas y acordes de (empresa).
                </p>
            </AccordionTab>
            <AccordionTab header="Opciones y medios para limitar el uso o divulgación de los datos">
                <p className="m-0">
                En todo momento el titular podrá limitar el uso o divulgación del tratamiento de sus datos personales, para tal efecto deberá ponerse en contacto a través del correo electrónico () y será necesario que presente su petición al responsable del manejo de la información de la organización cuyos datos de contacto vienen a continuación.
                </p>
                <p className="m-0">
                Medios para ejercer los derechos de acceso a los datos, rectificación, cancelación u oposición de los mismos, de conformidad con lo dispuesto por la ley.
                </p>
                <p className="m-0">
                El titular tiene derecho de acceder a sus datos personales que (empresa) posee y a los detalles del tratamiento de los mismos, rectificar en caso de ser inexactos o incompletos, cancelarlos cuando considere que no se requieren para alguna de las finalidades señaladas en el aviso de privacidad, así como a oponerse al tratamiento de los mismos y/o revocar en los casos que proceda, cuando la ley especifica lo permita, el consentimiento que para tal fin nos haya otorgado, a través de los procedimientos que se han implementado para tal efecto. Para conocer más detalles sobre el procedimiento respectivo, requisitos y plazos, puede contactar a la (nombre), responsable de manejo de la información, al siguiente correo electrónico ().
                </p>
                <p className="m-0">
                Procedimiento a seguir en caso de que el titular de los datos cambie de opinión posteriormente y decida revocar su consentimiento.
                </p>
                <p className="m-0">
                La petición debe de ir acompañada de la siguiente información:
                </p>
                <p className="m-0">
                Nombre completo de la persona que desea revocar el consentimiento y documento que acredite la personalidad o documento que acredite la representación legal en su caso.
                </p>
                <p className="m-0">
                Descripción clara y precisa de los datos personales respecto de los que se busca ejercer alguno de los derechos antes mencionados.
                </p>
                <p className="m-0">
                Domicilio, correo electrónico u otro medio para comunicarle la respuesta a su solicitud.
                </p>
                <p className="m-0">
                Cualquier otro documento que facilite la localización de los datos personales.
                </p>
                <p className="m-0">
                (Empresa) tendrá un plazo de 20 días contados, a partir de la fecha en que se recibió la solicitud, para atender y comunicarle al titular de la determinación adoptada, a efecto de que, si resulta procedente, se haga efectiva la misma dentro de los 15 días siguientes a la fecha en que se comunica la respuesta.
                </p>
                <p className="m-0">
                Tratándose de solicitudes de acceso de datos personales, procederá la entrega previa acreditación de la identidad del solicitante o representante legal según corresponda. Los plazos antes referidos podrán ser ampliados por una sola vez por un periodo igual, siempre y cuando así lo justifiquen las circunstancias del caso.
                </p>
            </AccordionTab>
            <AccordionTab header="Transferencia de datos">
                <p className="m-0">
                Para lograr el objeto y fines que persigue la organización, los datos personales pueden ser transferidos y tratados dentro del país. La información será compartida con fines estadísticos y administrativos. Si el titular de los datos personales no manifiesta oposición alguna y no lo informa al responsable mediante el procedimiento establecido previamente citado, se entenderá que ha otorgado su consentimiento para ello.
                No obstante lo anterior, la empresa se compromete a que la información que se transfiere a terceros y que se encuentra prevista en las excepciones que fija la ley de la materia para tal efecto, sea tratada de forma responsable, confidencial y exclusivamente por aquellas personas que requieren del conocimiento de dichos datos.
                </p>
            </AccordionTab>
            <AccordionTab header="Procedimiento y medios por el cual se comunicará a los titulares de cambios de aviso de privacidad">
                <p className="m-0">
                Atendiendo las directrices de la autoridad competente, en su caso, de ser necesario (empresa) realizara cambios o modificaciones al aviso de privacidad, atendiendo también los fines de la organización. En su caso estas modificaciones estarán disponibles en la página web institucional o se harán llegar a la brevedad al último correo electrónico que los titulares nos hayan proporcionado.
                Este documento atiende las disposiciones de la ley aplicable, para casos específicos y en atención al objeto social y fines de la organización, se atenderá la situación concreta y se le pondrá a la vista el aviso de privacidad simplificado cuyo contenido actualiza la información requerida en las fracciones I y II del artículo 16 de la ley de la materia y remite al presente aviso de privacidad completo. Cualquier modificación a este aviso se podrá consultar en la página institucional.
                Si alguna persona considera que su derecho de protección de datos personales ha sido lesionado por alguna conducta de los colaboradores de la organización, o de las actuaciones de la misma, presume que en el tratamiento de sus datos personales existe alguna violación a las disposiciones previstas en la Ley Federal de protección de Datos Personales en Posesión de Particulares, podrá interponer la queja o denuncia correspondiente ante el IFAI.
                </p>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default StaticPrivac