<?php

function instant_booking_form($form, &$form_submit){
	 $form['name'] = array(
		'#title' => t('Name'),
		'#type'	=> 'textfield',
		'#required' => TRUE,
		'#description' => 'Please enter full name'
	 );
	 
	 $form['description'] = array(
		'#title' => t('Description'),
		'#type'	=> 'textarea',
		'#required' => TRUE,
		'#description' => 'Please enter full name'
	 );
	 
	 $form['start_date'] = array(
		'#title' => t('Start Date'),
		'#type'	=> 'date_popup',
		'#required' => TRUE,
		'#date_format' => 'd-M-Y h:i',
		'#description' => 'Please enter event date'
	 );
	 
	 $form['end_date'] = array(
		'#title' => t('End Date'),
		'#type'	=> 'date_popup',
		'#required' => TRUE,
		'#date_format' => 'd-M-Y h:i',
		'#description' => 'Please enter event date'
	 );
	 
	 $form['submit'] = array(
		'#type' => 'submit',
		'#value' => 'Submit'
	 );
	 return $form;
 }
